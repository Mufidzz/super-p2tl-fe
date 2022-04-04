import React, { Fragment } from 'react';
import blogSingle from '../../assets/images/blog/blog-single.jpg';
import comment from '../../assets/images/blog/comment.jpg';
import { Container, Row, Col, Media } from 'reactstrap';
import { Comment } from '../../Constant';
import { Breadcrumbs, H4, H6, LI, P, UL } from '../../AbstractElements';
import { BlogSingleData } from '../Common/Data/Blog';

const BlogSingle = () => {
    return (
        <Fragment>
            <Breadcrumbs mainTitle="Blog Single" parent="Blog" title="Blog Single" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <div className="blog-single">
                            <div className="blog-box blog-details">
                                <Media className="img-fluid w-100" src={blogSingle} alt="blog-main" />
                                <div className="blog-details">
                                    <UL attrUL={{ className: 'blog-social flex-row simple-list' }}>
                                        <LI attrLI={{ className: 'digits' }} >{'25 July 2022'}</LI>
                                        <LI><i className="icofont icofont-user"></i>{'Mark'} <span>{'Jecno'} </span></LI>
                                        <LI attrLI={{ className: 'digits' }}><i className="icofont icofont-thumbs-up"></i>{'02'}<span>{'Hits'}</span></LI>
                                        <LI attrLI={{ className: 'digits' }}><i className="icofont icofont-ui-chat"></i>{'598 Comments'}</LI>
                                    </UL>
                                    <H4>
                                        {'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.'}
                                    </H4>
                                    <div className="single-blog-content-top">
                                        <P>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}</P>
                                        <P>{'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'}</P>
                                    </div>
                                </div>
                            </div>
                            <section className="comment-box">
                                <H4>{Comment}</H4>
                                <hr />
                                <ul>
                                    {BlogSingleData.map((item) =>
                                        <li key={item.id}>
                                            <Media className="align-self-center">
                                                <Media className="align-self-center" src={comment} alt="" />
                                                <Media body>
                                                    <Row>
                                                        <Col md="4">
                                                            <H6 attrH6={{ className: 'mt-0' }} >{item.name}<span> {`( ${item.post} ) `}</span></H6>
                                                        </Col>
                                                        <Col md="8">
                                                            <UL attrUL={{ className: 'comment-social float-left float-md-right simple-list' }} >
                                                                <LI attrLI={{ className: 'digits' }} ><i className="icofont icofont-thumbs-up"></i>{item.hits}</LI>
                                                                <LI attrLI={{ className: 'digits' }}><i className="icofont icofont-ui-chat"></i>{item.comments}</LI>
                                                            </UL>
                                                        </Col>
                                                    </Row>
                                                    <P>{item.para}</P>
                                                </Media>
                                            </Media>
                                        </li>
                                    )}
                                </ul>
                            </section>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment >
    );
};

export default BlogSingle;