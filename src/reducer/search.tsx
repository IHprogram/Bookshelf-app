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
          title: element.Item.title,
          author: element.Item.author,
          image: element.Item.largeImageUrl,
          price: element.Item.itemPrice,
          caption: element.Item.itemCaption,
          itemUrl: element.Item.itemUrl
        }
        state.push(oneBookInfo)
      })
      return [...state];
    default:
      return state;
  }
}