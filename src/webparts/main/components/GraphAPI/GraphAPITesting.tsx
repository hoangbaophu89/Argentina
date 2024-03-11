import * as React from "react";
import { GraphAPIService } from "../../../../services/graphAPI";

const GraphAPITesting = (props: {

}) => {

    const [myCountry, setMyCountry] = React.useState<string>();


    React.useEffect(
        () => {
            GraphAPIService.getMyCountry().then(
                c => {
                    console.log("c", c);
                    setMyCountry(c.value)
                }
            );
        }, []
    );



    return (<div>
        {
            myCountry
        }
    </div>
    );
};
export default GraphAPITesting;