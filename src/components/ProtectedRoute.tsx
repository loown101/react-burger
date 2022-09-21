import { ReactNode, FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../services/hooks';

type TProtectedRoute = {
  children?: ReactNode;
} & RouteProps

const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const user = useSelector(
    state => state.user
  )

  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация 
      // для неавторизованного пользователя
      render={({ location }) =>
        user.user ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: '/login',
              // В from сохраним текущий маршрут
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;