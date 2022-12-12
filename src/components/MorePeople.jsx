import React, { useEffect } from "react"
import RecommendedUser from "./RecommendedUser"
import ShowMore from "./ShowMore"
import { useSelector, useDispatch } from "react-redux"
import { getUsersAction } from "../redux/actions"
export default function MorePeople({ heading }) {
  let users = useSelector((state) => state.users.usersFromFetch)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="border side-component-border mt-2">
        <h6 className="text-left font-weight-bold ml-3 mt-3">{heading}</h6>

        {users.slice(0, 5).map((user, i) => (
          <div key={user.id}>
            <RecommendedUser user={user} />
            <hr style={{ width: "90%" }} />
          </div>
        ))}

        <ShowMore />
      </div>
    </>
  )
}
