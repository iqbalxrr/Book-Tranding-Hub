import React from 'react'

export default function Table({book}) {
 const { authorName, bookName, category, format, language, publishYear, tags, totalPages} = book || {}

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                  
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>Book Nmae</th>
                            <td>{bookName}</td>                           
                        </tr>
                        {/* row 2 */}
                          <tr>
                            <th>Author Nmae</th>
                            <td>{authorName}</td>                          
                        </tr>
                        {/* row 3 */}
                          <tr>
                            <th>Category</th>
                            <td>{category}</td>                           
                        </tr>
                        {/* row 4 */}
                         <tr>
                            <th>Format</th>
                            <td>{format}</td>                           
                        </tr>
                        {/* row 5 */}
                          <tr>
                            <th>Language</th>
                            <td>{language}</td>                           
                        </tr>
                        <tr>
                            <th>Paulish Year</th>
                            <td>{publishYear}</td>                           
                        </tr>
                        <tr>
                            <th>Total Page</th>
                            <td>{totalPages}</td>                           
                        </tr>
                        <tr>
                            <th>Tags</th>
                            <td>{tags}</td>                           
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
