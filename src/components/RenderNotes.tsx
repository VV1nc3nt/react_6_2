interface Props {
  content: string,
  deleteNote: React.MouseEventHandler<HTMLButtonElement>
}

export default function RenderNotes({ content, deleteNote }: Props) {
  return (
    <div className='note'>
      { content }
      <button className='delete-btn' onClick={ deleteNote }>x</button>
    </div>
  )
}
