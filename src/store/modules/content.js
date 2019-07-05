import {
  fetchItemById as fetchAppById,
  fetchItemsList as fetchAppsList
} from '@/services/client.apps.js'
import {
  fetchItemById as fetchArticleById,
  fetchItemsList as fetchArticlesList
} from '@/services/client.articles.js'
import { fetchItemsList as fetchAuthorsList } from '@/services/client.authors.js'
import {
  fetchItemById as fetchDatasetById,
  fetchItemsList as fetchDatasetsList
} from '@/services/client.datasets.js'
import {
  createItem,
  deleteItem,
  updateItem,
  updateItemStatus
} from '@/services/client.jobs.js'

export { namespaced, state, getters, mutations, actions }

const namespaced = true

const state = {
  item: {},
  itemId: '',
  itemlist: [],
  types: ['apps', 'articles', 'datasets'],
  typesAll: ['apps', 'authors', 'articles', 'datasets']
}

const getters = {
  itemToPost: state => {
    let item = state.item
    item.external = false

    if (item.apps) item.apps = item.apps.map(el => el._id)
    if (item.articles) item.articles = item.articles.map(el => el._id)
    if (item.authors) item.authors = item.authors.map(el => el._id)
    if (item.datasets) item.datasets = item.datasets.map(el => el._id)

    return item
  }
}

const mutations = {
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
    let item

    switch (contentType) {
      case 'apps':
        item = (await fetchAppById(id)).data
        break
      case 'articles':
        item = (await fetchArticleById(id)).data
        break
      case 'datasets':
        item = (await fetchDatasetById(id)).data
    }

    commit('SET_ITEM', item)
    commit('SET_ITEM_ID', id)
  },
  async fetchItemList({ commit }, { contentType, status }) {
    let list

    switch (contentType) {
      case 'apps':
        list = (await fetchAppsList(status)).data
        break
      case 'articles':
        list = (await fetchArticlesList(status)).data
        break
      case 'authors':
        list = (await fetchAuthorsList()).data
        break
      case 'datasets':
        list = (await fetchDatasetsList(status)).data
    }

    commit('SET_ITEM_LIST', list)
  },
  async updateItemToPublished(context, { contentType, id }) {
    return await updateItemStatus(contentType, id, 'published')
  },
  async updateItemToSubmitted(context, { contentType, id }) {
    return await updateItemStatus(contentType, id, 'submitted')
  },
  async updateItemToCreated(context, { contentType, id }) {
    return await updateItemStatus(contentType, id, 'created')
  },

  async deleteItem(context, { contentType, id }) {
    return await deleteItem(contentType, id)
  },
  async createItem({ state, getters }, contentType) {
    const item = getters.itemToPost
    if (contentType === 'apps')
      item.contributors = [{ title: 'ICJIA R&A staff' }]
    await createItem(contentType, getters.itemToPost, state.item)
  },
  async updateItem({ state, getters }, contentType) {
    return await updateItem(contentType, getters.itemToPost, state.itemId)
  }
}
