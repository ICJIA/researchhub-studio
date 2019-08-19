import {
  fetchItemById as fetchAppById,
  fetchItemsList as fetchAppsList
} from '@/services/client.apps'
import {
  fetchItemById as fetchArticleById,
  fetchItemsList as fetchArticlesList
} from '@/services/client.articles'
import {
  fetchItemById as fetchDatasetById,
  fetchItemsList as fetchDatasetsList
} from '@/services/client.datasets'
import {
  createItem,
  deleteItem,
  updateItem,
  updateItemStatus,
  uploadFile
} from '@/services/client.jobs'

export { namespaced, state, getters, mutations, actions }

const namespaced = true

const state = {
  filelist: [],
  item: {},
  itemId: '',
  itemlist: []
}

const getters = {
  itemToPost: state => {
    const item = { ...state.item }
    if (Object.keys(item).length) item.external = false

    Object.keys(item)
      .filter(key => /file$/.test(key))
      .forEach(key => delete item[key])

    if (item.apps) item.apps = item.apps.map(el => el._id)
    if (item.articles) item.articles = item.articles.map(el => el._id)
    if (item.datasets) item.datasets = item.datasets.map(el => el._id)

    return item
  }
}

const mutations = {
  SET_FILE_LIST(state, payload) {
    state.filelist = payload
  },
  SET_ITEM(state, payload) {
    state.item = payload
  },
  SET_ITEM_ID(state, payload) {
    state.itemId = payload
  },
  SET_ITEM_LIST(state, payload) {
    state.itemlist = payload
  }
}

const actions = {
  setFilelist({ commit }, filelist) {
    commit('SET_FILE_LIST', filelist)
  },
  setItem({ commit }, item) {
    commit('SET_ITEM', item)
  },
  setItemId({ commit }, id) {
    commit('SET_ITEM_ID', id)
  },
  clearAll({ commit }) {
    commit('SET_ITEM', {})
    commit('SET_ITEM_ID', '')
    commit('SET_ITEM_LIST', [])
  },
  async fetchItem({ commit }, { contentType, id }) {
    let res

    switch (contentType) {
      case 'apps':
        res = await fetchAppById(id)
        break
      case 'articles':
        res = await fetchArticleById(id)
        break
      case 'datasets':
        res = await fetchDatasetById(id)
    }

    commit('SET_ITEM', res.data)
    commit('SET_ITEM_ID', id)
    return res
  },
  async fetchItemList({ commit }, { contentType, status }) {
    let res

    switch (contentType) {
      case 'apps':
        res = await fetchAppsList(status)
        break
      case 'articles':
        res = await fetchArticlesList(status)
        break
      case 'datasets':
        res = await fetchDatasetsList(status)
    }

    commit('SET_ITEM_LIST', res.data)
    return res
  },
  async updateItemToPublished(_, { contentType, id }) {
    return await updateItemStatus(contentType, id, 'published')
  },
  async updateItemToSubmitted(_, { contentType, id }) {
    return await updateItemStatus(contentType, id, 'submitted')
  },
  async updateItemToCreated(_, { contentType, id }) {
    return await updateItemStatus(contentType, id, 'created')
  },

  async deleteItem(_, { contentType, id }) {
    return await deleteItem(contentType, id)
  },
  async createItem({ getters }, contentType) {
    const item = getters.itemToPost
    if (contentType === 'apps')
      item.contributors = [{ title: 'ICJIA R&A staff' }]
    await createItem(contentType, getters.itemToPost)
  },
  async updateItem({ state, getters }, contentType) {
    return await updateItem(contentType, state.itemId, getters.itemToPost)
  },
  async uploadFiles({ state }, contentType) {
    state.filelist.forEach(async el => {
      await uploadFile(contentType, el.field, el.file, state.itemId)
    })
  }
}
