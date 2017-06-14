app.factory("CampsiteFactory", function($http, $q, $routeParams, FIREBASE_CONFIG) {

    let fbGetCampsiteList = (parkId) => {
        let campsiteArray = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/campsites.json?orderBy="parkId"&equalTo="${parkId}"`)
                .then((fbCampsites) => {
                    let campsiteCollection = fbCampsites.data;
                    if (campsiteCollection !== null) {
                        Object.keys(campsiteCollection).forEach((key) => {
                            campsiteCollection[key].id = key;
                            campsiteArray.push(campsiteCollection[key]);
                        });
                    }
                    resolve(campsiteArray);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let fbPostNewCampsite = (newCampsite) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/campsites.json`, angular.toJson(newCampsite))
                .then((resultz) => {
                    resolve(resultz);
                }).catch((error) => {
                    reject(error);
                });
        });
    };

    let fbDeleteCampsite = campsiteId => {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/campsites/${campsiteId}.json`)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    };

    let fbGetSingleCampsite = (campsiteId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/campsites/${campsiteId}.json`)
                .then((results) => {
                    console.log("results", results);
                    results.data.id = id;
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    let fbEditCampsite = (campsite) => {
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/campsites/${campsite.id}.json`,
                JSON.stringify({
                    // ng model for campsite
                })
            ).then((resultz) => {
                resolve(resultz);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    return {
        fbGetCampsiteList: fbGetCampsiteList,
        fbGetSingleCampsite: fbGetSingleCampsite,
        fbPostNewCampsite: fbPostNewCampsite,
        fbDeleteCampsite: fbDeleteCampsite,
        fbEditCampsite: fbEditCampsite
    };


});
