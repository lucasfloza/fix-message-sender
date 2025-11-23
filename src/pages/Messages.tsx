import { useState } from 'react';
import Card from '../components/card/Card';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import Loader from '../components/loader/Loader';
import { useAsync } from '../hooks/useAsync';
import fixMessageService from '../services/fixMessageService';
import type { CreateFixMessageRequest } from '../types/fixMessage';
import './Messages.css';

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
    <div className="messages">
      <h1>Send FIX Message</h1>

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

          <div className="input-wrapper">
            <label className="input-label">Message Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="textarea"
              placeholder="FIX message content"
              rows={5}
              required
            />
          </div>

          {error && <div className="error-alert">{error}</div>}

          <div className="form-actions">
            <Button type="submit" loading={loading} disabled={loading}>
              Send Message
            </Button>
          </div>
        </form>
      </Card>

      {loading && <Loader fullScreen />}
    </div>
  );
};

export default Messages;
