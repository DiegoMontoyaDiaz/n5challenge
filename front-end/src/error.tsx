import {useRouteError} from "react-router-dom";

const ErrorPage: React.FC<any> = () => {
    const error: any = useRouteError();
    return (<div>¡oh no! {error.statusText} </div>);
};

export default ErrorPage;
