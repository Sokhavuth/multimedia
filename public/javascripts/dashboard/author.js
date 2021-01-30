// public/javascripts/dashboard/author.js
class Author{
  constructor(){
    this.page = 0;
  }

  loadAuthor(){
    author.page += 1;

    $('#load-more img').attr('src', '/images/loading.gif');

    $.get(`/admin/author/load/${author.page}`, function(data, status){
      if(status === "success"){
        author.listAuthor(data);
      }else{
        console.log(status);
      }
    });
  }

  listAuthor(data){
    const authors = data.authors;
    const thumbs = data.thumbs;
    var html = '';

    for(var v in authors){
      html += `<div class="wrapper">`;
      html += `<a href="/author/${authors[v].userid}"><img class="thumb" src="${thumbs[v]}" /></a>`;
      html += `<div>`;
      html += `<a href="/author/${authors[v].userid}">${authors[v].username}</a>`;
      html += `<div class='email'>${authors[v].email}</div>`;
      html += `<span class="date">${(new Date(authors[v].date)).toLocaleDateString('en-GB')}</span>`;
      html += `</div>`;
      html += `<div class="img-wrapper">`;
      html += `<a href="/admin/author/edit/${authors[v].userid}"><img src="/images/edit.png" /></a>`;
      html += `<a href="/admin/author/delete/${authors[v].userid}"><img src="/images/delete.png" /></a>`;
      html += `</div>`;
      html += `</div>`;
    }
    
    $('#post-list').append(html);
    $('#load-more img').attr('src', '/images/load-more.png');
  }

}//end class

const author = new Author();