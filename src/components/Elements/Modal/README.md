# Modal

Pop up modal I guess

## Usage

```jsx
// MyPage.jsx
import CustomModal from '../../components/Modal/CustomModal';

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1 className="font-bold">Example of modal usage</h1>
      <button onClick={openModal} type="button">
        Buka modal
      </button>
      <CustomModal isOpen={isOpen} closeModal={closeModal} label="example modal usage">
        <h1>Hello from modal</h1>
      </CustomModal>
    </div>
  );
}
```
