"use client"
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Categories() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories()
    }, [])
    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }
    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creatingPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setCategoryName('')
            fetchCategories();
            setEditedCategory(null)
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(creatingPromise, {
            loading: editedCategory ? 'Updating category' : 'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created successfully!',
            error: 'Category creation failed'
        })
    }
    if (profileLoading) {
        return 'Loading user info...'
    }
    if (!profileData.admin) {
        return 'Not an admin';
    }
    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs admin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <button className="border border-primary"
                            type="submit"
                        >{editedCategory ? 'Update' : 'Create'}</button>
                    </div>
                </div>

            </form>
            <div>
                {
                    categories.length > 0 ? <h1 className="mt-8 text-sm text-gray">Edit category:</h1> : ""
                }
                {
                    categories?.length > 0 && categories.map(c => (
                        <button key={c.name}
                            onClick={() => {
                                setEditedCategory(c);
                                setCategoryName(c.name);
                            }}
                            className="rounded-xl p-2 px-4 flex mb-1 gap-1 cursor-pointer">
                            <span>{c.name}</span>
                        </button>
                    ))
                }
            </div>
        </section>
    )
}