import * as React from "react";
import { MainService } from "../../../../services/MainService";
import { switchMap, take } from "rxjs";
import { ClassModel } from "../../../../models/Class";
import styles from './ClassRender.module.scss';
import { BaseButton, PrimaryButton } from "office-ui-fabric-react";
import { ListService } from "../../../../services/List-service";

const ClassRender = (props: {

}) => {

    const [allClass, setAllClass] = React.useState<ClassModel[]>([]);
    const [columns, setColumn] = React.useState<string[]>([]);
    const [refreshData, setRefreshData] = React.useState<number>(0);
    React.useEffect(
        () => {
            MainService.getAllClass().pipe(take(1)).subscribe(
                x => {
                    setAllClass(x);
                    if (x.length > 0) {
                        setColumn(Object.keys(x[0]));
                    }
                }
            )
        }, [refreshData]
    );



    return (<div className={styles.fluentTable}>
        <table>
            {
                columns.map(column => {
                    return <th>{column}</th>
                })
            }
            {
                allClass.map(
                    c => {
                        return <tr>
                            {
                                columns.map(
                                    column => <td>{c[column]}</td>
                                )
                            }
                        </tr>
                    }
                )
            }
        </table>
        <PrimaryButton
            onClick={
                () => {
                    ListService.getConextInfo().pipe
                        (
                            switchMap(
                                formDigit => {
                                    const newRequest = {
                                        __metadata: { type: "SP.Data.ClassListItem" },
                                        Title: `${Math.random()}`,
                                    };
                                    return ListService.addNewItem(
                                        newRequest,
                                        "Class",
                                        formDigit
                                    );
                                }
                            )
                        ).pipe(take(1)).subscribe(
                            done => {
                                setRefreshData(Math.random());
                            }
                        );
                }
            }
        >New Item</PrimaryButton>
    </div>
    );
};
export default ClassRender;