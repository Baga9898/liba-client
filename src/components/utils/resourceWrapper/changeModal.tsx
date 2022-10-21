type ChangeModalProps = {
    resource: {name: string};
}

const ChangeModal: React.FC<ChangeModalProps> = ({ resource }) => {
  return (
    <div className='changeModal'>
        <p>{`Changed: ${resource.name}`}</p>
        <p>{`When: 21.10.2022`}</p>
    </div>
  )
}

export default ChangeModal;