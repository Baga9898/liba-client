type ChangeModalProps = {
    resource: {name: string};
}

const ChangeModal: React.FC<ChangeModalProps> = ({ resource }) => {
  return (
    <div className='changeModal animate__animated animate__fadeInUp'>
        <p>Changed: <span>Name here</span></p>
        <p>When: <span>21.10.2022</span></p>
    </div>
  )
}

export default ChangeModal;