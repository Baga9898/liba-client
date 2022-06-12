const defaultState = {
    countAllResources: 0,
    countBooks: 0,
    countWebsites: 0,
    countPosts: 0,
    countSofts: 0,
  }

export const countOfResourcesReducer = (state=defaultState, action: {type: string, payload: number}) => {
    switch (action.type) {
      case 'GET_COUNT_ALLRESOURCES':
        return ({ ...state, countAllResources: action.payload });
  
      case 'GET_COUNT_BOOKS':
        return ({ ...state, countBooks: action.payload });
  
      case 'GET_COUNT_WEBSITES':
        return ({ ...state, countWebsites: action.payload });
  
      case 'GET_COUNT_POSTS':
        return ({ ...state, countPosts: action.payload });

      case 'GET_COUNT_SOFTS':
        return ({ ...state, countSofts: action.payload })
    
      default:
        return state;
    }
}