app.factory("ParkFactory", function($http, $q, $routeParams, FIREBASE_CONFIG) {

  let fbGetAllParks = () => {
    let parkArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/parks.json`)
      .then((fbparks) => {
        let boardCollection = fbBoards.data;
        if (boardCollection !== null) {
            Object.keys(boardCollection).forEach((key) => {
            boardCollection[key].parkId=key;
            parkArray.push(boardCollection[key]);
          });
        }
        resolve(parkArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  

  let fbPostNewPark = newBoard => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/parks.json`,
        JSON.stringify(newBoard))
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