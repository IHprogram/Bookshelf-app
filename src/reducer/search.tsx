import { SET_SEARCH_RESULT } from '../actions';

interface BookInfoType {
  title: string,
  author: string,
  image: string,
  price: number,
  caption: string,
  itemUrl: string
}

const initialState: BookInfoType[] = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      state = [];
      action.result.forEach(element => {
        const oneBookInfo: BookInfoType = {
          title: element.title,
          author: element.author,
          image: element.image,
          price: element.price,
          caption: element.caption,
          itemUrl: element.itemUrl
        }
        state.push(oneBookInfo)
      })
      return [...state];
    default:
      return state;
  }
}