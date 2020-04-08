import {delay} from 'redux-saga/effects';
import {put, takeEvery, all} from 'redux-saga/effects';
import dataApi from '../servers';

function* workerFetchApi() {
  yield put({type: 'FETCH_DATA_API', value: dataApi});
}
export function* watchFilterName() {
  yield takeEvery('DATA_REQUESTED', workerFetchApi);
}

// function* workerFilterUserSaga({ name }) {
//   yield call(delay, 500);
//   const searchName = name.toLowerCase().trim();
//   const posts = yield select(state => state.posts);
//   const filteredPost = posts.filter((post) => {
//     return post.name.toLowerCase().includes(searchName)
//   });
//   yield put({ type: ‘FILTERED_USERS’, filteredUsers });
// }
// export function* watchFilterName() {
//   yield takeEvery('FILTER_REQUESTED', workerFetchApi);
// }

export default function* rootSaga() {
  yield all([watchFilterName()]);
}
