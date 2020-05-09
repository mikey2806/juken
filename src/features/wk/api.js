import _ from 'lodash';
import { request, collection } from 'src/features/wk/request';
import { GET } from 'src/common/constants';
import { setUser, removeUser, setApiKey, removeApiKey } from 'src/features/wk/state';
import run from 'src/utils/run';

import _reviews from 'src/mock/reviews.mock.json';
import _subjects from 'src/mock/subjects.mock.json';
// const _reviews = __reviews.slice(0, 2);

/**
 * use GET user as a way to validate api key
 */
export const login = (opts = {}) => async dispatch => {
  const { apiKey, onSuccess, onError, _start, _stop } = opts;  
  
  try {
    run(_start);
    
    const user = await request({
      endpoint: 'user',
      method: GET,
      apiKey,
    });

    dispatch(setUser(user));
    dispatch(setApiKey(apiKey));

    run(_stop);
    run(onSuccess, user);

  } catch(e) {
    run(_stop);
    run(onError, e);
  }
};

/**
 * clear api key and user from state
 */
export const logout = ({ _stop }) => async dispatch => {
  dispatch(removeUser());
  dispatch(removeApiKey());
  run(_stop);
};

/**
 * get immediately available reviews and their subjects
 */
export const getReviewMaterial = (opts = {}) => async () => {
  const { onSuccess, onError, _start, _stop } = opts;

  try {
    run(_start);
    
    /*
    // get immediately available reviews
    const reviews = await collection({
      endpoint: 'assignments',
      method: GET,
      params: {
        immediately_available_for_review: true
      },
    }) || [];

    // stop here if there are no immediate reviews
    if (reviews.length === 0) {
      run(_stop);
      run(onSuccess, { reviews, subjects: [] })
      return;
    }
    
    // get subjects for these
    const subjects = await collection({
      endpoint: 'subjects',
      method: GET,
      params: {
        ids: reviews
          .map(r => _.get(r, 'data.subject_id'))
          .filter(Boolean)
          .join(',')
      },
    })
    */

    run(_stop);
    // run(onSuccess, { reviews, subjects })
    run(onSuccess, { reviews: _reviews, subjects: _subjects })

  } catch(e) {
    run(_stop);
    run(onError, e)
  }
}

