import CreateTodoCard from './_components/CreateTodo/CreateTodo'
import TaskTableData from './_components/TaskTableData/TaskTableData'

export default function Home() {
  return (
    <main>
      <h1 className='text-2xl uppercase font-bold text-center my-4'>
        Todo Task Management
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-[400px_minmax(900px,_1fr)] gap-4 container mx-auto'>
        <CreateTodoCard />
        <TaskTableData />
      </div>
    </main>
  )
}
