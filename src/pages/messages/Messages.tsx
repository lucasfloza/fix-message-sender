import { useState } from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Loader from '../../components/loader/Loader';
import { useAsync } from '../../hooks/useAsync';
import type { CreateFixMessageRequest } from '../../types/services/fixMessage';
import fixMessageService from '../../services/fixMessageService';
import * as S from './Messages.styled';

const Messages: React.FC = () => {
  const [formData, setFormData] = useState<CreateFixMessageRequest>({
    messageType: '',
    sender: '',
    target: '',
    content: '',
  });

  const { execute, loading, error } = useAsync<
    unknown,
    [CreateFixMessageRequest]
  >();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await execute(
      (data: CreateFixMessageRequest) => fixMessageService.create(data),
      formData
    );
    if (result) {
      alert('Message sent successfully!');
      setFormData({
        messageType: '',
        sender: '',
        target: '',
        content: '',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <S.Container>
      <S.Title>Send FIX Message</S.Title>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Message Type"
            name="messageType"
            value={formData.messageType}
            onChange={handleChange}
            placeholder="e.g., NewOrderSingle"
            required
          />

          <Input
            label="Sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            placeholder="Sender ID"
            required
          />

          <Input
            label="Target"
            name="target"
            value={formData.target}
            onChange={handleChange}
            placeholder="Target ID"
            required
          />

          <div>
            <S.TextAreaLabel>Message Content</S.TextAreaLabel>
            <S.TextArea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="FIX message content"
              rows={5}
              required
            />
          </div>

          {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

          <S.FormActions>
            <Button type="submit" loading={loading} disabled={loading}>
              Send Message
            </Button>
          </S.FormActions>
        </form>
      </Card>

      {loading && <Loader fullScreen />}
    </S.Container>
  );
};

export default Messages;
