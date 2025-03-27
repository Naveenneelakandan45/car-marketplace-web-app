import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import carDetails from './../components/Shared/carDetails.json';
import featuresList from './../components/Shared/features.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { db } from './../../configs';
import { CarListing, CarImages } from './../../configs/schema';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import { eq } from 'drizzle-orm';
import { FormatResult } from '@/components/Shared/Service';
import TextAreaField from './components/TextAreaField';

function AddListing() {
  const [formData, setFormData] = useState({ images: [] });
  const [featuresData, setFeaturesData] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const [carInfo, setCarInfo] = useState(null);
  const mode = searchParams.get('mode');
  const recordId = searchParams.get('id');

  useEffect(() => {
    if (mode === 'edit' && recordId) {
      GetListingDetail();
    }
  }, [mode, recordId]);

  const GetListingDetail = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, recordId));

      const resp = FormatResult(result);
      setCarInfo(resp[0]);
      setFormData({ ...resp[0], images: resp[0].images || [] });
      setFeaturesData(resp[0].features || {});
    } catch (error) {
      console.error('Error fetching listing details:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFeatureChange = (name) => {
    setFeaturesData((prevData) => ({ ...prevData, [name]: !prevData[name] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error('User email is undefined');
      setLoader(false);
      return;
    }

    try {
      const listingData = {
        ...formData,
        features: JSON.stringify(featuresData),
        createdBy: user.primaryEmailAddress.emailAddress,
        userName:user?.fullName,
        userImageUrl:user?.imageUrl,
        postedOn: moment().format('DD/MM/yyyy'),
      };

      if (mode === 'edit') {
        await db.update(CarListing).set(listingData).where(eq(CarListing.id, recordId)).execute();

        await db.delete(CarImages).where(eq(CarImages.carListingId, recordId)).execute();
        await Promise.all(
          formData.images.map(async (imageUrl) => {
            await db.insert(CarImages).values({
              imageUrl,
              carListingId: recordId,
            }).execute();
          })
        );

        navigate('/profile');
      } else {
        const result = await db.insert(CarListing).values(listingData).returning({ id: CarListing.id }).execute();

        if (result.length > 0) {
          const newCarListingId = result[0].id;
          await Promise.all(
            formData.images.map(async (imageUrl) => {
              await db.insert(CarImages).values({
                imageUrl,
                carListingId: newCarListingId,
              }).execute();
            })
          );

          navigate('/profile');
        }
      }
    } catch (e) {
      console.error('Error saving car listing:', e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <Toaster />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">{mode === 'edit' ? 'Edit Listing' : 'Add New Listing'}</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>
          {/* Car Details Section */}
          <h2 className="font-medium text-xl mb-6">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {carDetails.carDetails.map((item, index) => (
              <div key={index}>
                <label className="text-sm flex gap-2 items-center mb-1">
                  <IconField icon={item?.icon} />
                  {item?.label} {item.required && <span className="text-red-600">*</span>}
                </label>
                {item.fieldType === 'text' || item.fieldType === 'number' ? (
                  <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                ) : item.fieldType === 'dropdown' ? (
                  <DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                ) : item.fieldType === 'textarea' ? (
                  <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                ) : null}
              </div>
            ))}
          </div>

          {/* Car Features Section */}
          <h2 className="font-medium text-xl mt-10 mb-6">Car Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {featuresList.features.map((feature, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={featuresData[feature.name] || false}
                  onChange={() => handleFeatureChange(feature.name)}
                />
                {feature.label}
              </label>
            ))}
          </div>

          <Separator className="my-6" />
          
          {/* Image Upload Section */}
          <UploadImages setFormData={setFormData} setLoader={setLoader} carInfo={carInfo} />

          {/* Submit Button */}
          <div className="mt-10 flex justify-end">
            <Button type="submit">
              {!loader ? 'Submit' : <BiLoaderAlt className="animate-spin text-lg" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
