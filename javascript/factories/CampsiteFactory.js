app.factory("CampsiteFactory", function($http, $q, $routeParams, FIREBASE_CONFIG) {

    let fbGetAllCampsites = (parkId) => {
        let campsiteArray = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/campsites.json?orderBy="parkId"&equalTo="${parkId}"`)
                .then((fbCampsites) => {
                    let campsiteCollection = fbCampsites.data;
                    if (campsiteCollection !== null) {
                        Object.keys(campsiteCollection).forEach((key) => {
                            campsiteCollection[key].campsiteId = key;
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

    let fbCreateNewCampsite = (newCampsite) => {
        console.log(newCampsite);
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
                    //results.data = id;
                    resolve(results.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    let fbEditCampsite = (campsite) => {
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/campsites/${campsiteId}.json`,
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
        fbGetAllCampsites: fbGetAllCampsites,
        fbGetSingleCampsite: fbGetSingleCampsite,
        fbCreateNewCampsite: fbCreateNewCampsite,
        fbDeleteCampsite: fbDeleteCampsite,
        fbEditCampsite: fbEditCampsite
    };


});
