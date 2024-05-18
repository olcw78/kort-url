const { StatusCodes } = require('http-status-codes')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createShortenedUrl(req, res) {
  const { knex, urlShortener, log } = req.app.locals
  const { original_url } = req.body

  try {
    let { shortened_url } = await knex
      .from('urls')
      .select('shortened_url')
      .where('url', original_url)
      .first()

    if (shortened_url) {
      res.status(StatusCodes.CREATED).json({ shortened_url })
      return
    }

    shortened_url = urlShortener.makeShortenedUrl(original_url)
    await knex('urls').insert({
      url: original_url,
      shortened_url,
    })
    res.status(StatusCodes.CREATED).json({ shortened_url })
  } catch (error) {
    log.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function redirectToOriginalUrl(req, res) {
  const { redis, knex, log, urlShortener } = req.app.locals
  const { shortened_url } = req.body

  try {
    // 1. shortened_url 이 cache 되어있는지 확인
    const cachedUrl = await redis.GET(shortened_url)
    if (cachedUrl && typeof cachedUrl === 'string') {
      // res
      //   .status(StatusCodes.MOVED_PERMANENTLY)
      //   .json({ original_url: cachedUrl })
      res.status(StatusCodes.MOVED_PERMANENTLY).redirect(cachedUrl)
      return
    }

    // 2. cache 안 되어 있으면 db 에서 조회
    let { url: original_url } = await knex
      .from('urls')
      .where('shortened_url', shortened_url)
      .select('url')
      .first()

    if (!original_url || typeof original_url !== 'string') {
      original_url = urlShortener.makeOriginalUrl(original_url)
      log.info(`[makeOriginalUrl] restored original URL: ${original_url}`)
      await knex('urls').insert({ url: original_url })
    }

    res.status(StatusCodes.MOVED_PERMANENTLY).redirect(original_url)
    // res
    //   .status(StatusCodes.MOVED_PERMANENTLY)
    //   .json({ original_url })
  } catch (error) {
    log.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

module.exports = {
  createShortenedUrl,
  redirectToOriginalUrl,
}
