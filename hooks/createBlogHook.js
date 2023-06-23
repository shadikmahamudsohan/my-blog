const createBlogHook = async (text, imageName, refresh, setRefresh) => {
    console.log(refresh);
    fetch('/api/post_blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: text, imageName }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // setRefresh(refresh + 1);
                alert(refresh);
            } else {
                console.log("some thing went wrong when creating this data");
            }
        });
};

export default createBlogHook;