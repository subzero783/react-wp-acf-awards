

const {useState, useEffect} = wp.element;

import './App.scss';

const App = () => {

  const [ acf, setAcf ] = useState({
    winnerSection : {
      text: null,
      image: null
    },
    recentAwards : {
      title: null, 
      awards: []
    },
    pastAwards : {
      title: null,
      awards : []
    }
  })

  let res = null

  useEffect(()=>{

    async function getPageContent(id){
      
      res = await fetch( `/wp-json/wp/v2/pages/${id}`);
      
      if(!res.ok){
        return
      }

      let theData = await res.json()

      setAcf({
        winnerSection: {
          text: theData.acf.winner_section.text,
          image: theData.acf.winner_section.image
        }, 
        recentAwards: {
          title: theData.acf.recent_awards.title,
          awards: theData.acf.recent_awards.awards
        }, 
        pastAwards: {
          title: theData.acf.past_awards.title,
          awards: theData.acf.past_awards.awards
        }
      })

    }

    const bodyClasses = document.body.classList;
    let pageId = null;
    for(var i = 0; i < bodyClasses.length; i++){
      if(bodyClasses[i].toString().startsWith('page-id-')){
        pageId = bodyClasses[i]
        let parts = pageId.split('-')
        pageId = parts.pop()
      }
    }
    getPageContent(pageId)
    
  }, [])

  const dropdownArrowClick = (e) => { 
    console.log(e.target)
    const theTarget = e.target
    const parent = theTarget.parentElement
    const nextSibling = parent.nextElementSibling
    if(nextSibling.classList.contains('open')){
      parent.classList.remove('open')
      nextSibling.classList.remove('open')
    }else{
      parent.classList.add('open')
      nextSibling.classList.add('open')
    }
  }
  
  const get_award_row = (award) => {
    if(award.multiple === true){
      return(
        <>
          <h3 className="heading-600">{award.title}</h3>
          <ul className="multiple-awards">
            {
              award.boxes.map((box, index)=>{
                return(
                  <li key={index} className="box" style={{maxWidth: `${box.max_width}px`}}>
                    <img className="award-trophy" src="/wp-content/themes/ascent_child/assets/images/graphics/svg/award-trophy.svg" alt="Award trophy" />
                    <p className="box-text" dangerouslySetInnerHTML={{__html: box.text}}/>
                  </li>
                )
              })
            }
          </ul>
        </>
      )
    }else{
      return(
        <>
          <h3 className="heading-600">{award.title}</h3>
          { award.boxes ? 
            <div class="dropdowns">
              {
                award.boxes.map((box, index)=>{
                  return(
                    <div className="dropdown-container">
                      <div key={index} className="award-dropdown-information">
                        <img className="award-trophy" src="/wp-content/themes/ascent_child/assets/images/graphics/svg/award-trophy.svg" alt="Award trophy" />
                        <h4 className="dropdown-title" dangerouslySetInnerHTML={{__html: box.text}} />
                        <img 
                          className="dropdown-arrow" 
                          src="/wp-content/themes/ascent_child/assets/images/graphics/svg/dropdown-arrow-2.svg" 
                          alt="dropdown arrow"
                          onClick={dropdownArrowClick}
                        />
                      </div>
                      <ul className="dropdown">
                        {
                          box.multiple_awards.map((award, index)=>{
                            return(
                              <li key={index} className="dropdown-item-title" dangerouslySetInnerHTML={{__html:award.title}}/>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </div> : ''
          }
        </>
      )
    }
  }

  return (
    <>
      <section className="winner-section">
        <div className="container">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
              <div className="orange-separator" />
              {
                acf.winnerSection.text ? <div className="text" dangerouslySetInnerHTML={{__html: acf.winnerSection.text}}/> : ''
              }
            </div>
            <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              {
                acf.winnerSection.image ? <div className="image" dangerouslySetInnerHTML={{__html:acf.winnerSection.image}} /> : ''
              }
            </div>
          </div>
        </div>
      </section>
      <section className="recent-awards-section">
        <div className="container">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {
                acf.recentAwards.title ? <h2 className="title heading-800">{acf.recentAwards.title}</h2> : ''
              }
            </div>
          </div>
          { acf.recentAwards.awards ? 
            <ul className="awards">
              {
                acf.recentAwards.awards.map((award, index)=>{

                  const str = award.image;
                  const n = str.lastIndexOf('/');
                  const lastPartOfName = str.substring(n + 1);
                  const imageName = lastPartOfName.substr(0, lastPartOfName.indexOf('.'));
                  
                  return(
                    <li key={index} className={`award-container ${imageName}`}>
                      {
                        award.image ? <img className="image" src={award.image} /> : ''
                      }
                      {
                        award.text ? <div className="text" dangerouslySetInnerHTML={{__html: award.text}}/> : ''
                      }
                    </li>
                  )
                })
              }
            </ul>
            : ''
          }
        </div>
      </section>
      <section className="past-awards">
        <div className="container">
          <div className="row awards-title">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {
                acf.pastAwards.title ? <h2 className="heading-800">{acf.pastAwards.title}</h2> : ''
              }
            </div>
          </div>
          {
            acf.pastAwards.awards ? 
            <ul className="awards">
              {
                acf.pastAwards.awards.map((award, index)=>{
                  return(
                    <li key={index} className={`award-container col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12`}>
                      {
                        get_award_row(award)
                      }
                    </li>
                  )
                })
              } 
            </ul> : ''
          }
        </div>
      </section>
    </>
  );
};
export default App;