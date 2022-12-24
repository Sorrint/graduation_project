// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUsersDataStatus, loadUsersList } from '../../../store/users';
// import { loadReviewsList } from '../../../store/review';

// const UsersLoader = ({ children }) => {
//     const dispatch = useDispatch();
//     const usersDataStatus = useSelector(getUsersDataStatus());

//     useEffect(() => {
//         if (!usersDataStatus) {
//             dispatch(loadUsersList());
//             dispatch(loadReviewsList());
//         }
//     }, [usersDataStatus]);
//     if (!usersDataStatus) return 'loading...';
//     return children;
// };

// UsersLoader.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
// };

// export default UsersLoader;
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, loadUsersList } from '../../../store/users';
import { loadReviewsList } from '../../../store/review';

const UsersLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    // const usersLoadingStatus = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUsersList());
            dispatch(loadReviewsList());
        }
    }, [isLoggedIn]);

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UsersLoader;
