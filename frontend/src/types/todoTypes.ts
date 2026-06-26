export type TodoStatus=('pending'|'inprogress'|'done')

export interface TodoType{
    id:number;
    title:string;
    description:string;
    status:TodoStatus;
}
export interface TodoCreate{
    title: string;
    status: TodoStatus;
    description: string;
}

export type KpiType={all:number,progress:number,done:number,pending:number}