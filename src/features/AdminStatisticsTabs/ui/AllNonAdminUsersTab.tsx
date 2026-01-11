'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Mail, Star, User } from 'lucide-react';
import { FC } from 'react';

import { UserRole } from '../../Auth/types';
import { AllNonAdminUsers } from '../types';

import { UserProfileDialog } from './UserProfileDialog';
import { getImage } from '@/src/shared/lib/get-image';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';

interface AllNonAdminUsersTabProps {
  allNonAdminUsers?: AllNonAdminUsers[];
  isLoading?: boolean;
}

export const AllNonAdminUsersTab: FC<AllNonAdminUsersTabProps> = ({
  allNonAdminUsers,
  isLoading,
}) => {
  // const [selectedUserId, setSelectedUserId] = useState<string>();
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>View and manage all non-admin users</CardDescription>
        </CardHeader>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>Loading users...</div>
        </CardContent>
      </Card>
    );
  }

  if (!allNonAdminUsers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>View and manage all non-admin users</CardDescription>
        </CardHeader>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>No users available</div>
        </CardContent>
      </Card>
    );
  }

  // const handleOpenDialog = () => {
  //   setIsDialogOpen(prev => !prev);
  // };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge className='bg-purple-500 hover:bg-purple-600'>Admin</Badge>
        );
      case 'REGULAR':
        return <Badge variant='secondary'>User</Badge>;
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 2000) return 'text-yellow-600';
    if (rating >= 1500) return 'text-blue-600';
    if (rating >= 1000) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>
            View and manage all non-admin users ({allNonAdminUsers.length}{' '}
            users)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allNonAdminUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                          {user.picture ? (
                            <Avatar>
                              <AvatarImage
                                src={getImage(user.picture)}
                                alt='user.displayName'
                              />
                              <AvatarFallback>
                                {user.displayName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className='bg-muted flex h-full w-full items-center justify-center rounded-full'>
                              <User className='h-5 w-5' />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className='font-medium'>{user.displayName}</div>
                          <div className='text-muted-foreground text-xs'>
                            ID: {user.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Mail className='text-muted-foreground h-3 w-3' />
                        <span className='text-sm'>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Star
                          className={`h-4 w-4 ${getRatingColor(user.rating)}`}
                        />
                        <span
                          className={`font-medium ${getRatingColor(user.rating)}`}
                        >
                          {user.rating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <UserProfileDialog
                        userId={user.id}
                        picture={user.picture}
                        displayName={user.displayName}
                        email={user.email}
                        rating={user.rating}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <div className='text-muted-foreground text-sm font-medium'>
                  Total Users
                </div>
                <User className='h-4 w-4' />
              </div>
              <div className='text-2xl font-bold'>
                {allNonAdminUsers.length}
              </div>
              <div className='text-muted-foreground mt-1 text-sm'>
                Non-admin users only
              </div>
            </div>

            <div className='rounded-lg border p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <div className='text-muted-foreground text-sm font-medium'>
                  Average Rating
                </div>
                <Star className='h-4 w-4' />
              </div>
              <div className='text-2xl font-bold'>
                {allNonAdminUsers.length > 0
                  ? Math.round(
                      allNonAdminUsers.reduce(
                        (sum, user) => sum + user.rating,
                        0
                      ) / allNonAdminUsers.length
                    )
                  : 0}
              </div>
              <div className='text-muted-foreground mt-1 text-sm'>
                Across all users
              </div>
            </div>

            <div className='rounded-lg border p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <div className='text-muted-foreground text-sm font-medium'>
                  Top Rating
                </div>
                <Star className='h-4 w-4 text-yellow-600' />
              </div>
              <div className='text-2xl font-bold text-yellow-600'>
                {allNonAdminUsers.length > 0
                  ? Math.max(...allNonAdminUsers.map(user => user.rating))
                  : 0}
              </div>
              <div className='text-muted-foreground mt-1 text-sm'>
                Highest rating among users
              </div>
            </div>
          </div>

          {allNonAdminUsers.length > 0 && (
            <div className='mt-6 rounded-lg border p-4'>
              <h3 className='mb-3 font-semibold'>Rating Distribution</h3>
              <div className='grid grid-cols-4 gap-2 text-sm'>
                <div className='bg-chart-1/40 border-chart-1 rounded-lg border-2 p-2 text-center'>
                  <div className='font-bold'>0-999</div>
                  <div>
                    {allNonAdminUsers.filter(u => u.rating < 1000).length} users
                  </div>
                </div>
                <div className='bg-chart-2/40 border-chart-2 rounded-lg border-2 p-2 text-center'>
                  <div className='font-bold'>1000-1499</div>
                  <div>
                    {
                      allNonAdminUsers.filter(
                        u => u.rating >= 1000 && u.rating < 1500
                      ).length
                    }{' '}
                    users
                  </div>
                </div>
                <div className='bg-chart-3/40 border-chart-3 rounded-lg border-2 p-2 text-center'>
                  <div className='font-bold'>1500-1999</div>
                  <div>
                    {
                      allNonAdminUsers.filter(
                        u => u.rating >= 1500 && u.rating < 2000
                      ).length
                    }{' '}
                    users
                  </div>
                </div>
                <div className='bg-chart-4/40 border-chart-4 rounded-lg border-2 p-2 text-center'>
                  <div className='font-bold'>2000+</div>
                  <div>
                    {allNonAdminUsers.filter(u => u.rating >= 2000).length}{' '}
                    users
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
