import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  article: null,
  editArticle: false,
  
}

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setArticle: (state, action) => {
      state.article = action.payload
    },
    setEditArticle: (state, action) => {
      state.editArticle = action.payload
    },
    resetArticleState: (state) => {
      state.step = 1
      state.article = null
      state.editArticle = false
    },
  },
})

export const {
  setStep,
  setArticle,
  setEditArticle,
 
  resetArticleState,
} = articleSlice.actions

export default articleSlice.reducer