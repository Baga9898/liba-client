type ChangeModalProps = {
    resource: {
      changedBy: string,
      modifiedDate: any,
    };
}

const ChangeModal: React.FC<ChangeModalProps> = ({ resource }) => {
  return (
    <div className='changeModal animate__animated animate__fadeInUp'>
        <p>Changed: <span>{resource.changedBy}</span></p>
        <p>When: <span>{resource.modifiedDate}</span></p>
    </div>
  )
}

export default ChangeModal;