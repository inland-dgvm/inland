#include "inland_config.h"

#ifdef SINGLE_POINT_MODEL
#error "This subroutine should NOT be compiled for 0D INLAND model option."
#endif

! This subroutine reads in daily fields..
! ---------------------------------------------------------------------
subroutine rdday(jday, istyr, iwest, jnorth)
! ---------------------------------------------------------------------
      use inland_parameters
      use inland_control, only: imonth, iyear, datadir
      use inland_combcs
      use inland_comwork

      implicit none

! Arguments
      integer jday,   & ! day of the year
              istyr,  & ! 1st year in data files
              iwest,  & ! 1st lon index for subset
              jnorth    ! 1st lat index for subset

! Local variables
      integer i,    & ! loop indice on years after istyr
              istat   ! error flag for netcdf

      character*1024 filen
      character*1024 :: directory
      character*80 :: suffix
      integer istart(4), icount(4)
      logical :: file_e

      data istart / 1,1,1,1 /, icount / nlon,nlat,1,1 /
      istart(1) = iwest
      istart(2) = jnorth
      icount(1) = nlonsub
      icount(2) = nlatsub

      if (iyear .lt. istyr) then
         print *, 'daily data begins in year ', istyr
         print *, 'not reading in daily data'
         stop 1
      end if

! count how many days since beginning of daily data
! daily data begin on Jan 1, istyr
      if (iyear .eq. istyr) then
         istart(4) = jday
      else
         istart(4) = 0
         do 10 i = istyr, iyear-1
            istart(4) = istart(4) + 365
            if (mod(i,4).eq.0) then
               if (mod(i,100).ne.0) then
                  istart(4) = istart(4) + 1
               else if (mod(i/100,4).eq.0) then
                  istart(4) = istart(4) + 1
               end if
            end if
10       continue
        istart(4) = jday
      end if

      directory = trim(datadir)//'/daily/'

! read daily precip
      aname = 'prec'
      write(suffix,'(A,I4,A)') '.daily.',iyear,'.nc'
      filen = trim(directory)//trim(aname)//trim(suffix)

      ! make sure this file exists, if not print error and exit
      inquire( file=trim(filen), exist=file_e )
      if ( .not. file_e ) then
         write (*,*) ''
         write (*,*) 'ERROR: input file '//trim(filen)//' does not exist!'
         write (*,*) 'make sure INLAND_DATADIR is set to proper path and that file exists'
         stop 1
      end if

      call readvar(filen,aname,xinprecd,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

! read daily temp
      aname = 'temp'
      filen = trim(directory)//trim(aname)//trim(suffix)
      call readvar(filen,aname,xintd,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

! read daily trange
!      aname = 'trange'
!      filen = 'input/daily/trange.daily.nc'
!      call arr2vec( work, xintrngd(1) )

! read daily cloudiness
      aname = 'cld'
      filen = trim(directory)//trim(aname)//trim(suffix)
      call readvar(filen,aname,xincldd,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

! read daily windspeed
      aname = 'wspd'
      filen = trim(directory)//trim(aname)//trim(suffix)
      call readvar(filen,aname,xinwindd,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

! read daily srelative humidity
      aname = 'rh'
      filen = trim(directory)//trim(aname)//trim(suffix)
      call readvar(filen,aname,xinqd,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

! read tmax temperature
      aname = 'tmax'
      filen = trim(directory)//trim(aname)//trim(suffix)
      call readvar(filen,aname,xintmaxd,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

! read tmin temperature
      aname = 'tmin'
      filen = trim(directory)//trim(aname)//trim(suffix)
      call readvar(filen,aname,xintmind,istart,icount,0,istat)
      if (istat.lt.0) goto 9999

      return

9999  if (istat .ne. 0) then
         write(*,*) 'ERROR in rdday, '//trim(aname)
         ! TODO is this test really needed?
         if (iyear .gt. 1997) then
            print *, 'Attempted to read past last day in file?'
         end if
         stop 1
      end if

end subroutine rdday
