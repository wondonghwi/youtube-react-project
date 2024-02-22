import { useForm } from 'react-hook-form';
import { BsSearch, BsYoutube } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface FormValues {
  searchText: string;
}

function SearchHeader() {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      searchText: keyword || '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const encodedSearchText = encodeURIComponent(data.searchText);
    navigate(`/videos/${encodedSearchText}`);
  };

  return (
    <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
      <Link
        to='/'
        className='flex items-center'>
        <BsYoutube className='text-4xl text-brand' />
        <h1 className='font-bold ml-2 text-3xl'>Youtube</h1>
      </Link>
      <form
        className='w-full flex justify-center'
        onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('searchText')}
          className='w-7/12 p-2 outline-none bg-black text-gray-50'
          type='text'
          placeholder='Search...'
        />
        <button className='bg-zinc-600 p-4'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}

export default SearchHeader;
