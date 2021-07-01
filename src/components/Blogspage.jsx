import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import "../styles/blogspage.css";

const Blogspage = () => {
    const searchInput = useSelector(selectUserInput);
    const URL = `https://gnews.io/api/v4/search?q=${searchInput}&token=${process.env.API_TOKEN}`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(URL)
            .then((res) => {
                dispatch(setBlogData(res.data));
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [searchInput]);

    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? (
                <h1 className="loading">Loading fresh blogs...</h1>
            ) : (
                <div className="blogs">
                    {blogs?.articles?.map((blog, id) => {
                        return (
                            <a
                                key={blog.source.name + id}
                                href={blog.url}
                                className="blog"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={blog.image} alt="blog-img" />
                                <div>
                                    <h3 className="sourceName">
                                        <span>{blog.source.name}</span>
                                        <span>{blog.publishedAt}</span>
                                    </h3>
                                    <h1>{blog.title}</h1>
                                    <p>{blog.description}</p>
                                </div>
                            </a>
                        );
                    })}
                    {blogs?.totalArticles === 0 && (
                        <h1 className="no__blogs">
                            No Blogs available 😔. Want to read something else?
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blogspage;
