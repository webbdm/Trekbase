app.factory("CommentFactory", function($http, $q, $rootScope, $routeParams, FIREBASE_CONFIG) {

    let fbGetAllComments = (campsiteId) => {
        let commentArray = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/comments.json?orderBy="campsiteId"&equalTo="${campsiteId}"`)
                .then((comment) => {
                    let commentCollection = comment.data;
                    if (commentCollection !== null) {
                        Object.keys(commentCollection).forEach((key) => {
                            commentCollection[key].commentId = key;
                            commentArray.push(commentCollection[key]);
                        });
                    }
                    resolve(commentArray);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let fbGetSingleComment = (commentId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/comments/${commentId}.json`)
                .then((resultz) => {
                    //console.log("comment resultz",resultz);
                    resolve(resultz.data);
                }).catch((error) => {
                    reject(error);
                });
        });
    };

    let fbPostNewComment = (newComment,Id) => {
        newComment.creator = $rootScope.user.username;
        newComment.campsiteId = Id;
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/comments.json`,
                    JSON.stringify(newComment))
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    };

    let fbDeleteComment = commentId => {
        console.log(commentId);
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/comments/${commentId}.json`)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    };

    let fbEditComment = comment => {
        //console.log("factory", comment);
        let commentId = comment.commentId;
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/comments/${commentId}.json`,
                    JSON.stringify(comment))
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    };

    return {
        fbGetAllComments: fbGetAllComments,
        fbGetSingleComment: fbGetSingleComment,
        fbPostNewComment: fbPostNewComment,
        fbDeleteComment: fbDeleteComment,
        fbEditComment: fbEditComment
    };


});
