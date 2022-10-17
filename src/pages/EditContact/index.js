import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

import Loader from '../../components/Loader';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);
        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        }
      }
    }
    loadContact();
  }, [id, history, isMounted]);

  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const updatedContact = await ContactsService.updateContact(id, contact);

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
