import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, formatDistanceToNow } from "date-fns";
import { allNotificationsRead, selectMetadataEntities, useGetNotificationsQuery } from "./notificationsSlice";
import { selectAllUsers } from "../users/usersSlice";
import classnames from "classnames";

export const NotificationsList = () => {
  const dispatch = useDispatch();
  const { data: notifications = []} = useGetNotificationsQuery();
  const notificationsMetadata = useSelector(selectMetadataEntities);
  const users = useSelector(selectAllUsers);

  // useLayoutEffect 를 이용해 브라우저에 그리기 전에 실행하여 업데이트로 깜빡이지 않게 한다.
  useLayoutEffect(() => { 
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    };

    const metadata = notificationsMetadata[notification.id]
    const notificationClassname = classnames('notification', {
      new: metadata.isNew
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
          <div title={notification.date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      </div>
    )
  });

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
};
