import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalonCategories } from "../redux/action/categoryAction";
import { getAllChaires } from "../redux/action/chairActions";
// import { getAllTables } from "../redux/action/tableActions";
// import { getBranchCategories } from "../redux/action/categoryActions";

import {
  getBranchServices,
  getSalonServices,
} from "../redux/action/serviceActions";

import getToken from "./getToken";

function useFriendStatus(friendID) {
  const dispatch = useDispatch();
  const { salonId, branchId } = useSelector((state) => state.user);
  const [ready, setReady] = useState(false);

  const delayReady = () => {
    setReady(true);
  };
  function handleCheckToken() {
    const tkn = getToken();
    if (tkn) {
      dispatch(getSalonServices({ salonId }))
        .then((res) => {
          delayReady(true);
        })
        .catch((err) => {
          delayReady(true);
        });
      dispatch(getAllSalonCategories({ salonId }));

      dispatch(getAllChaires({ salonId }));

      // dispatch(getBranchCategories(restaurantId, branchId, "true"));

      // dispatch(getBranchServices(branchId, "true"));
    } else {
      delayReady(true);
    }
  }
  useEffect(() => {
    handleCheckToken();
  }, []);

  return ready;
}
export default useFriendStatus;

// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import getToken from "./getToken";
// import { getUserDetails } from "../redux/action/employeeActions";

// const checkIfAppReady = (data) => {
// const dispatch = useDispatch();
//   const [ready, setReady] = useState(false);

// const delayReady = () => {
//   setReady(true);
// };
// async function handleCheckToken() {
//   const tkn = await getToken();
//   if (tkn) {
//     // dispatch(getUserDetails())
//     //   .then((res) => {
//     //     delayReady(true);
//     //   })
//     //   .catch((err) => {
//     //     delayReady(true);
//     //   });
//   } else {
//     delayReady(true);
//   }
// }

//   useLayoutEffect(() => {
//     handleCheckToken();
//   }, []);

//   return ready;
// };

// export default checkIfAppReady;
