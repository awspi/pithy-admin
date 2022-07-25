import localCache from '@/utils/storage'
const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}
const sortRanking = () => {
  const articleList = localCache.getItem('mock-articles')
  const afterArticle = articleList.map((article, index) => {
    article.ranking = index + 1
    return article
  })
  localCache.setItem('mock-articles', afterArticle)
}
export const getArticleList = (req, res) => {
  sortRanking()
  const articleList = localCache.getItem('mock-articles')
  // 获取传递参数
  const pageindex = getQuery(req.url, 'page')
  const pagesize = getQuery(req.url, 'size')
  const start = (pageindex - 1) * pagesize
  const end = pagesize * pageindex
  const totalPage = Math.ceil(articleList.length / pagesize)
  const returnList = pageindex > totalPage ? [] : articleList.slice(start, end)
  //
  return {
    success: true,
    code: 200,
    data: {
      list: returnList.sort((a, b) => {
        return a.ranking - b.ranking
      }),
      total: articleList.length,
      page: pageindex,
      size: pagesize
    },
    message: 'success'
  }
}
export const articleSort = (req, res) => {
  const initRanking = JSON.parse(req.body).initRanking
  const finalRanking = JSON.parse(req.body).finalRanking
  console.log(initRanking, finalRanking)
  const articleList = localCache.getItem('mock-articles')
  const newArticleList = []
  // for (let i = 0; i < articleList.length; i++) {

  // }
  articleList.forEach((article) => {
    //交换ranking
    if (article.ranking === initRanking) {
      article.ranking = finalRanking
    } else if (article.ranking === finalRanking) {
      article.ranking = initRanking
    }
    newArticleList.push(article)
  })
  console.log(newArticleList)
  localCache.setItem('mock-articles', newArticleList)
  return { success: true, code: 200, data: null, message: '排名重设成功' }
}

export const createArticle = (req, res) => {
  const articleList = localCache.getItem('mock-articles')
  const userToken = localCache.getItem('mock-token')

  const author = userToken.username
  const title = JSON.parse(req.body).title
  const content = JSON.parse(req.body).content
  const obj = {
    _id: Math.random().toString(36).substr(2),
    ranking: articleList.length + 1,
    title,
    author,
    publicDate: new Date().getTime().toString(),
    desc: title,
    content,
    _v: 0
  }
  articleList.unshift(obj)
  localCache.setItem('mock-articles', articleList)
  return {
    success: true,
    code: 200,
    data: null,
    message: '文章创建成功'
  }
}

export const deleteArticle = (req, res) => {
  const _id = req.url.split('/')[4]
  const rowData = localCache.getItem('mock-articles')
  const newData = []
  rowData.forEach((item) => {
    if (item._id !== _id) {
      newData.push(item)
    }
  })
  localCache.setItem('mock-articles', newData) //会直接覆盖
  return {
    success: true,
    code: 200,
    data: null,
    message: '文章删除成功'
  }
}
export const articleContent = (req, res) => {
  const _id = req.url.split('/')[3]
  const articleList = localCache.getItem('mock-articles')
  const targetArticle = articleList.find((article) => {
    return article._id === _id
  })
  return {
    success: true,
    code: 200,
    data: targetArticle,
    message: 'success'
  }
}
export const editArticle = (req, res) => {
  const _id = JSON.parse(req.body).id
  const title = JSON.parse(req.body).title
  const content = JSON.parse(req.body).content
  const articleList = localCache.getItem('mock-articles')
  const newArticleList = articleList.map((article) => {
    if (article._id === _id) {
      article.title = title
      article.content = content
    }
    return article
  })
  localCache.setItem('mock-articles', newArticleList)
  return {
    success: true,
    code: 200,
    data: null,
    message: 'success'
  }
}
