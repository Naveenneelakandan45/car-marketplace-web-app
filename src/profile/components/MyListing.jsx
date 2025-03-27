import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { db } from './../../../configs';
import { CarImages, CarListing } from './../../../configs/schema';
import { useUser } from '@clerk/clerk-react';
import CarItem from '@/components/CarItem';
import { eq, desc } from 'drizzle-orm';
import { FormatResult } from '@/components/Shared/Service';
import { FaTrashAlt } from 'react-icons/fa';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function MyListing() {
    const { user } = useUser();
    const [carList, setCarList] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        if (user) {
            GetUserCarListing();
        }
    }, [user]);

    const GetUserCarListing = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) {
            console.error("User email is undefined");
            return;
        }
    
        try {
            const result = await db
                .select()
                .from(CarListing)
                .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
                .where(eq(CarListing.createdBy, user.primaryEmailAddress.emailAddress))
                .orderBy(desc(CarListing.id))
                .execute();
    
            const resp = FormatResult(result);
            setCarList(resp);
        } catch (error) {
            console.error("Error fetching user listings:", error);
        }
    };

    const handleDeleteCar = async () => {
        if (!selectedCar) return;
    
        try {
            await db.delete(CarListing).where(eq(CarListing.id, selectedCar.id)).execute();
            setCarList(carList.filter(car => car.id !== selectedCar.id));
            setSelectedCar(null);
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to={'/add-listing'}>
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-4'>
                {carList.map((item) => (
                    <div key={item.id}>
                        <CarItem car={item} />
                        <div className='p-2 bg-gray-50 flex justify-between gap-3'>
                            <Link to={'/add-listing?mode=edit&id=' + item.id} className='w-full'>
                                <Button variant='outline' className='w-full'>Edit</Button>
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant='destructive' onClick={() => setSelectedCar(item)}>
                                        <FaTrashAlt />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your listing.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteCar}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyListing;
