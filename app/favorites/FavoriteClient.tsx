'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeFavorite, SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoriteClientProps {
  favorites: SafeFavorite[],
  currentUser?: SafeUser | null,
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  favorites,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/favorites/${id}`)
    .then(() => {
      toast.success('取消成功！');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="旅行计划"
        subtitle="你曾经去过哪里，以及你将要去哪里"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {favorites.map((favorite: any) => (
          <ListingCard
            data={favorite}
            key={favorite.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default FavoriteClient;