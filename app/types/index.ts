import { Listing, Reservation, User } from "@prisma/client";

/* 
这段代码定义了一个 `SafeUser` 类型，它是基于 `User` 类型进行定义，并使用 `Omit` 类型删除了 `User` 类型中的 `"createdAt"`, `"updatedAt"`, `"emailVerified"` 这三个属性。
然后，通过 `&` 运算符将删除后的类型和一个新的对象合并，这个新的对象包含了 `createdAt`，`updatedAt` 和 `emailVerified` 这三个属性，它们的类型分别为 `string`，`string` 和 `string | null`。
因此，`SafeUser` 类型表示了一个安全的用户对象，它排除了一些敏感信息（如 `createdAt`，`updatedAt` 和 `emailVerified`）并添加了一些新的属性来表示这些信息。
这个新的对象可以用来在应用程序中传递用户信息，以保护用户的隐私和安全。
*/
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string|null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listinf"> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};

export type SafeFavorite = SafeListing;

export type SafePropery = SafeListing;