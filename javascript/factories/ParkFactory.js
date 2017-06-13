app.factory("ParkFactory", function($http, $q, $routeParams, FIREBASE_CONFIG) {

  let fbGetAllParks = () => {
    let parkArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/parks.json`)
      .then((fbParks) => {
        let parkCollection = fbParks.data;
        if (parkCollection !== null) {
            Object.keys(parkCollection).forEach((key) => {
            parkCollection[key].parkId=key;
            parkArray.push(parkCollection[key]);
          });
        }
        resolve(parkArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let fbPostNewPark = newPark => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/parks.json`,
        JSON.stringify(newPark))
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  let fbDeletePark = parkId => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/parks/${parkId}.json`)
      .then(result => resolve(result))
      .catch(error => reject(error));
    });
  };

  let fbEditPark = park => {
    let parkId = park.parkId;
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/parks/${parkId}.json`,
        JSON.stringify(park))
      .then(result => resolve(result))
      .catch(error => reject(error));
    });
  };

  return {
    fbGetAllParks:fbGetAllParks,
    fbPostNewPark:fbPostNewPark,
    fbDeletePark:fbDeletePark,
    fbEditPark:fbEditPark
  };

});