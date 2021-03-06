import products from '../models/products.js'

export const createProducts = async (req, res) => {
  try {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
      res.status(400).send({ success: false, message: '格式錯誤' })
      return
    }
    const result = (await products.create(req.body)).toObject()
    delete result.password
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '重複' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getProducts = async (req, res) => {
  try {
    const query = {
      $and: []
    }
    if (req.query.pricelte && !isNaN(parseInt(req.query.pricelte))) {
      query.$and.push({ price: { $lte: parseInt(req.query.pricelte) } })
    }

    if (req.query.pricegte && !isNaN(parseInt(req.query.pricegte))) {
      query.$and.push({ price: { $gte: parseInt(req.query.pricegte) } })
    }

    if (query.$and.length === 0) {
      delete query.$and
    }

    const result = await products.find(query)
    // const priceGte = await products.find({ price: { $gte: 200 } })
    // const priceLte = await products.find({ price: { $lte: 10 } })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editProducts = async (req, res) => {
  try {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
      res.status(400).send({ success: false, message: '格式錯誤' })
      return
    }
    // .lean() 把回傳的東西從 mongoose 的 document 物件轉成一般的 json 物件
    // 如果找不到東西的話 result 會是 null
    const result = await products.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean()
    if (result) {
      delete result.password
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到' })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '重複' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteProducts = async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const searchProducts = async (req, res) => {
  try {
    const result = await products.findById(req.params.id, {}).lean()
    // await products.findById(req.params.id)
    // const result = await products.find({})
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
