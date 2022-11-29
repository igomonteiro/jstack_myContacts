import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger,
  visible,
  isLoading,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  children,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  let container = document.getElementById('modal-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'modal-root';
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container isLeaving={!visible} danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button className="cancel-button" type="button" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </button>
            <Button isLoading={isLoading} danger={danger} type="button" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
