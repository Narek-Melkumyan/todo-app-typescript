import type {KpiType} from "../types/todoTypes.ts";

type Props ={
    kpiData:KpiType
}
function TodoStats({kpiData}:Props) {


    return (
        <div className="todo-stats">
            <div>
                <span>All</span>
                <strong id="totalCount">{kpiData.all}</strong>
            </div>
            <div>
                <span>in Progress</span>
                <strong id="activeCount">{kpiData.progress}</strong>
            </div>
            <div>
                <span>Pending</span>
                <strong id="activeCount">{kpiData.pending}</strong>
            </div>
            <div>
                <span>Done</span>
                <strong id="doneCount">{kpiData.done}</strong>
            </div>
        </div>

    );
}

export default TodoStats;
