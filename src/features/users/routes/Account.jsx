import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import { Button, Spinner } from '@/components/Elements';
import { FormControl, Input, Label } from '@/components/Form';
import { Protected } from '@/components/Routes';

export function Account() {
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

  const save = (e) => {
    e.preventDefault();
    const config = {
      method: 'patch',
      url: `${BASE_API_URL}/user/updateProfile/`,
      data: {
        gender: formData.gender,
        country: formData.country,
        address: formData.address,
        phone: formData.phone,
        province: formData.province,
        city: formData.city
      },
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then((response) => {
        toast(response.data.message);
      })
      .catch((error) => {
        toast(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASE_API_URL}/user/myProfile`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setFormData(data.data);
    })();
  }, []);

  return (
    <Protected>
      {formData ? (
        <div className="flex justify-center my-4">
          <form className="flex flex-col min-w-[320px]">
            <h1 className="font-bold text-2xl">Account Detail</h1>

            <FormControl>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                value={formData.username}
                disabled
              />
            </FormControl>

            <FormControl>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="example@mail.com"
                onChange={handleChange}
                value={formData.email}
                disabled
              />
            </FormControl>

            <FormControl>
              <Label>Phone</Label>
              <Input
                type="text"
                name="phone"
                placeholder="+6281220220"
                onChange={handleChange}
                value={formData.phone}
              />
            </FormControl>

            <FormControl>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
              />
            </FormControl>

            <FormControl>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={formData.city}
              />
            </FormControl>

            <FormControl>
              <Label>Province</Label>
              <Input
                type="text"
                name="province"
                placeholder="Province"
                onChange={handleChange}
                value={formData.province}
              />
            </FormControl>

            <FormControl>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                value={formData.country}
                required
              />
            </FormControl>

            <Label>Gender</Label>
            <FormControl className="max-w-sm">
              <label className="label cursor-pointer">
                <span className="label-text">Male</span>
                <input
                  className="radio"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === 'Male'}
                />
              </label>
            </FormControl>
            <FormControl className="max-w-sm">
              <label className="label cursor-pointer">
                <span className="label-text">Female</span>
                <input
                  className="radio"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === 'Female'}
                />
              </label>
            </FormControl>

            <div className="mt-4 flex gap-4">
              <Button className="w-[150px]" onClick={() => navigate('/')}>
                Cancel
              </Button>

              <Button type="submit" onClick={save} className="w-[150px]">
                Save
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Spinner textContent="Getting your profile" />
      )}
    </Protected>
  );
}
