import './styled/modal.scss'

type Props = {
    onClose: () => void
    visible: boolean,
    children: string | React.ReactNode
}

export const Modal: React.FC<Props> = ({ children, onClose, visible }) => {
    if (!visible) {
        return null
    }
    return (
        <div className={'modalOverlay'} onClick={onClose}>
            <div className='modalContent' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}